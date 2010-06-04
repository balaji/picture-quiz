package com;

import java.awt.Container;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.UIManager;

public class PictureQuiz extends JApplet {

	private static int DIMENSION = 3;
	private static final long serialVersionUID = 1L;
	private List<String> questions;

	@Override
	public void init() {
		setSize(600, 600);
		questions = new ArrayList<String>();
		for (int i = 0; i < 9; i++)
			questions.add("This is question number " + i);
		try {
			UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
		} catch (Exception ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	public void start() {
		try {
			prepareFrame(getContentPane());
		} catch (Exception e) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, e);
		}
	}

	private void prepareFrame(final Container container) throws MalformedURLException, IOException {
		JPanel panel = new BackgroundPanel(new GridLayout(DIMENSION, DIMENSION));
		JButton button;
		for (int i = 0; i < DIMENSION * DIMENSION; i++) {
			button = new JButton(String.valueOf(i + 1));
			button.setFocusable(false);
			button.addActionListener(new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					JButton me = (JButton) e.getSource();
					JOptionPane.showMessageDialog(container, questions.get(Integer.parseInt(me.getText())), "Quiz",
							JOptionPane.QUESTION_MESSAGE);
					me.setVisible(false);
				}
			});
			panel.add(button);
		}
		container.add(panel);
	}
}

class BackgroundPanel extends JPanel {
	private static final long serialVersionUID = 1L;
	Image image;

	public BackgroundPanel(LayoutManager layoutManager) throws MalformedURLException, IOException {
		super(layoutManager);
		image = javax.imageio.ImageIO.read(new java.net.URL("file:///home/balaji/Downloads/im/06qa-done.jpg"));
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		if (image != null) {
			g.drawImage(image, 0, 0, this.getWidth(), this.getHeight(), this);
		}
	}
}