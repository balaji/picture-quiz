package com;

import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.imageio.ImageIO;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.UIManager;

public class PictureQuiz extends JApplet {

	private int dimension;
	private static final long serialVersionUID = 1L;
	private List<String> questions;

	@Override
	public void init() {
		dimension = Integer.parseInt(getParameter("size"));
		setSize(600, 600);
		String[] qs = getParameter("questions").split(",");
		questions = new ArrayList<String>();
		for (int i = 0; i < dimension * dimension; i++) {
			questions.add(qs[i]);
		}
		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		} catch (Exception ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	public void start() {
		try {
			prepareFrame(getParameter("image"));
		} catch (Exception e) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, e);
		}
	}

	private void prepareFrame(String imageName) throws MalformedURLException, IOException {
		final Image image = ImageIO.read(new File(imageName));
		JPanel panel = new JPanel(new GridLayout(dimension, dimension)) {
			private static final long serialVersionUID = 1L;

			@Override
			protected void paintComponent(Graphics g) {
				super.paintComponent(g);
				g.drawImage(image, 0, 0, this.getWidth(), this.getHeight(), this);
			}
		};

		JButton button;
		for (int i = 0; i < dimension * dimension; i++) {
			button = new JButton(String.valueOf(i + 1));
			button.setFocusable(false);
			button.addActionListener(new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					JButton me = (JButton) e.getSource();
					JOptionPane.showMessageDialog(getContentPane(), questions.get(Integer.parseInt(me.getText()) - 1), "Quiz",
							JOptionPane.QUESTION_MESSAGE);
					me.setVisible(false);
				}
			});
			panel.add(button);
		}
		getContentPane().add(panel);
	}
}